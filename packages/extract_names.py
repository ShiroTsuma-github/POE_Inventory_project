import os
import json
from bs4 import BeautifulSoup
import re

# Function to extract item names from HTML content
def extract_item_names(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    item_spans = soup.find_all('span')
    item_names = [re.sub(r'\s+', ' ', span.get_text()).strip() for span in item_spans]
    return item_names

# Process files in the 'welp' directory
directory = 'welp'
all_item_names = set()

for filename in os.listdir(directory):
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r') as file:
        html_content = file.read()
        item_names = extract_item_names(html_content)
        all_item_names.update(item_names)

# Sort the item names alphabetically
sorted_item_names = sorted(all_item_names)

# Write the sorted list to a JSON file
with open('item_names.json', 'w') as json_file:
    json.dump(sorted_item_names, json_file)

print("Item names extracted, sorted alphabetically, and saved to 'item_names.json'.")
