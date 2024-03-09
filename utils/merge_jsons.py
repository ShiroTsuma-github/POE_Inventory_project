import json

def merge_and_sort_json(file1, file2, output_file):
    # Load data from the first JSON file
    with open(file1, 'r') as f1:
        data1 = json.load(f1)

    # Load data from the second JSON file
    with open(file2, 'r') as f2:
        data2 = json.load(f2)

    # Merge the lists and convert to a set to remove duplicates
    merged_data = list(set(data1 + data2))

    # Sort the merged data alphabetically
    merged_data.sort()

    # Write the sorted data to the output JSON file
    with open(output_file, 'w') as outfile:
        json.dump(merged_data, outfile, indent=4)

file1 = 'item_names.json'
file2 = 'items.json'

# Path to the output JSON file
output_file = 'merged_sorted.json'

# Call the function to merge and sort the JSON files
merge_and_sort_json(file1, file2, output_file)

print("Merged and sorted data saved to", output_file)