import json
import os

def load_curriculum():
    file_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "data",
        "curriculum.json"
    )

    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)