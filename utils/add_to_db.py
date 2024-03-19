import json
import os


ROOT_DIR = os.path.dirname(os.path.abspath(__file__)).replace("utils", "")

with open(ROOT_DIR + 'data/items.json', 'r') as f:
    item_list = json.load(f)
    item = ''
    while item != 'q':
        item = input('Enter item name: ')
        if item == 'q':
            break
        item_list.append(item)
    item_list = list(set(item_list))
    item_list.sort()
    with open(ROOT_DIR + 'data/items.json', 'w') as f:
        json.dump(item_list, f, indent=4)