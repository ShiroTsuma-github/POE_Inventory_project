from packages import app
from flask import render_template
import os
import json
app.config["DEBUG"] = True
ROOT_DIR = os.path.dirname(os.path.abspath(__file__)).replace("packages", "")

# https://www.geeksforgeeks.org/how-to-build-a-web-app-using-flask-and-sqlite-in-python/

# w formie komentarz
items = json.loads(open(ROOT_DIR + "data/items.json").read())

@app.route('/')
def index():
    return render_template("base.html", items=items)


