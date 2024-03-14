from packages import app
from flask import jsonify, redirect, render_template, request, url_for
import os
import uuid
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from random import choice
from datetime import datetime
from flask_caching import Cache
import json

cache = Cache(config={'CACHE_TYPE': 'SimpleCache'})
CORS(app)
app.config["DEBUG"] = True
cache.init_app(app)
ROOT_DIR = os.path.dirname(os.path.abspath(__file__)).replace("packages", "")
UPLOAD_FOLDER = ROOT_DIR + 'static/images/' + 'uploads/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


userData = [
    {
        'name': 'ShiroTsuma',
        'messages': 11,
        'coins': 265,
        'lvl_offset': [0, -21]
    },
    {
        'name': 'Hubinix',
        'messages': 23,
        'coins': 745,
        'lvl_offset': [0, -337]
    },
    {
        'name': 'Dawid Nakrewicz',
        'messages': 1,
        'coins': 10,
        'lvl_offset': [0, 0]
    },
    {
        'name': 'unlogged',
        'messages': 0,
        'coins': 0,
        'lvl_offset': [0, 0]
    }
]
leagues = ['Hardcore Affliction', 'Ruthless Affliction', 'HC Ruthless Affliction',
           'Standard', 'Hardcore', 'Ruthless', 'Hardcore Ruthless']
currencies = [['Awakened Sextant', 'images/orbs/sextant_awakened.png'], ['Ancient Orb', 'images/orbs/orb_ancient.png'],
              ['Orb of Annulment', 'images/orbs/orb_annulment.png'], ['Orb of Binding', 'images/orbs/orb_binding.png'], ['Divine Orb', 'images/orbs/orb_divine.png'], ['Elevated Sextant', 'images/orbs/sextant_elevated.png']]
all_currencies = currencies + [['Chaos Orb', 'images/orbs/orb_chaos.png']]
items = json.loads(open(ROOT_DIR + "data/items.json").read())
database = json.loads(open(ROOT_DIR + "data/database.json").read())
item_amount = len(database)
prices = {
    'Chaos Orb': 1,
    'Ancient Orb': 5,
    'Orb of Annulment': 15,
    'Orb of Binding': 20,
    'Divine Orb': 150,
    'Awakened Sextant': 2,
    'Elevated Sextant': 200
}
iter_ = -1
# now = datetime.now()
# now.strftime("%y.%m.%d  %H:%M:%S")


@app.route('/')
# @cross_origin()
# @cache.cached(timeout=5)
def index():
    global iter_
    return render_template("results.html",
                           items=items,
                           userdata=userData[0],
                           leagues=leagues,
                           currencies=currencies,
                           item_amount=item_amount,
                           results=database,
                           prices=prices)
    iter_ += 1
    # return render_template("base.html",
    #                        items=items,
    #                        userdata=userData[iter_ % 4],
    #                        leagues=leagues,
    #                        currencies=currencies)


@app.route('/del/<id>')
@cross_origin()
def delete(id):
    global database
    database = [i for i in database if i['id'] != int(id)]
    with open(ROOT_DIR + "data/database.json", "w") as file:
        file.write(json.dumps(database))
    return jsonify(success=True)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_images(item_image, description_image):
    """Save images with randomized filenames."""
    # Generate random filenames
    item_image_filename = str(uuid.uuid4()) + '.png'  # Example: '3a96a30e-4d6b-4ebf-998d-7c3ec1b61a6d.png'
    description_image_filename = str(uuid.uuid4()) + '.png'

    # Save images with randomized filenames
    item_image.save(os.path.join(app.config['UPLOAD_FOLDER'], item_image_filename))
    description_image.save(os.path.join(app.config['UPLOAD_FOLDER'], description_image_filename))

    return item_image_filename, description_image_filename


@app.route('/add', methods=['POST'])
# @cross_origin()
def add():
    global item_amount
    global database
    item_image = request.files['item_image']
    description_image = request.files['item_description']

    # Check if files are provided and have allowed extensions
    if item_image and allowed_file(item_image.filename) and \
            description_image and allowed_file(description_image.filename):
        # Save images
        item_image_filename, description_image_filename = save_images(item_image, description_image)
        item_image_filename = 'images/uploads/' + item_image_filename
        description_image_filename = 'images/uploads/' + description_image_filename

        # Access other form data
        item_name = request.form['item_name'].strip()
        league = request.form['league'].strip()
        price = request.form['price']
        currency = request.form['currency'].strip()

        # Convert price to int if not empty
        price = int(price) if price else None

        # Process and store data as needed
        # Example: Saving data to a database
        data = {
            'id': item_amount + 1,
            'user': userData[0]['name'],
            'timestamp': datetime.now().strftime("%d.%m.%y %H:%M:%S"),
            'item_name': item_name,
            'item_image': item_image_filename,
            'item_description': description_image_filename,
            'league': league,
            'price': price,
            'currency': currency,
            'currency_image': all_currencies[[i[0] for i in all_currencies].index(currency)][1],
            # Add more fields as needed
        }
        with open(ROOT_DIR + "data/temp.json", "w") as file:
            # database.append(data)
            file.write(json.dumps(data))

        # Store data to database or perform other operations
        # database.save(data)
        database.append(data)
        item_amount += 1
        with open(ROOT_DIR + "data/database.json", "w") as file:
            file.write(json.dumps(database))

        return jsonify(success=True, data=data)
    else:
        return jsonify(error='Invalid file(s) provided or file extensions not allowed'), 400