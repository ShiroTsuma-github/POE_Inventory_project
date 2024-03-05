from packages import app
from flask import render_template, request, redirect, url_for
from flask import g
import os
app.config["DEBUG"] = True
ROOT_DIR = os.path.dirname(os.path.abspath(__file__)).replace("packages", "")

# https://www.geeksforgeeks.org/how-to-build-a-web-app-using-flask-and-sqlite-in-python/

# w formie komentarz


@app.route('/')
def index():
    return render_template("base.html")
