from packages import app
from flask import render_template
import os
from random import choice
import json
app.config["DEBUG"] = True
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
currencies = [['Awakened Sextant', 'images/sextant_awakened.png'], ['Ancient Orb', 'images/orb_ancient.png'],
              ['Orb of Annulment', 'images/orb_annulment.png'], ['Orb of Binding', 'images/orb_binding.png'], ['Divine Orb', 'images/orb_divine.png'], ['Elevated Sextant', 'images/sextant_elevated.png']]
items = json.loads(open(ROOT_DIR + "data/items.json").read())
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


@app.route('/')
def index():
    global iter_
    return render_template("base.html",
                           items=items,
                           userdata=userData[0],
                           leagues=leagues,
                           currencies=currencies)
    iter_ += 1
    # return render_template("base.html",
    #                        items=items,
    #                        userdata=userData[iter_ % 4],
    #                        leagues=leagues,
    #                        currencies=currencies)
