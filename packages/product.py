from packages import app
from flask import jsonify, redirect, render_template, url_for
import os
from random import choice
from datetime import datetime
from flask_caching import Cache
import json

cache = Cache(config={'CACHE_TYPE': 'SimpleCache'})
app.config["DEBUG"] = True
cache.init_app(app)
ROOT_DIR = os.path.dirname(os.path.abspath(__file__)).replace("packages", "")


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
def delete(id):
    global database
    database = [i for i in database if i['id'] != int(id)]
    return jsonify(success=True)
    # json.dump(database, open(ROOT_DIR + "data/database.json", "w"))
    # return render_template("results.html",
    #                        items=items,
    #                        userdata=userData[0],
    #                        leagues=leagues,
    #                        currencies=currencies,
    #                        item_amount=item_amount,
    #                        results=database,
    #                        prices=prices)
    # return redirect(url_for('index'))