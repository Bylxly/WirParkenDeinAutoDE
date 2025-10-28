import json
import random

# (ZoneNr, num_of_spaces)
structure = {
             1: 23,
             2: 18,
             3: 18,
             4: 18,
             5: 18,
             6: 18,
             7: 18,
             8: 12,
             9: 12,
             10: 7,
             }

def generate_data():
    # Hauptstruktur mit einer Liste
    data = [
        {
            "zones": []
        }
    ]

    for z in range(1, len(structure) + 1):
        
        spaces = []

        for s in range(1, structure[z] + 1):
            space = {
                "space_id": f"p{s}",
                "occupied": random.choice([True, False])
            }
            spaces.append(space)

        zone = {
            "zone_id": f"z{z}",
            "spaces": spaces
        }

        data[0]["zones"].append(zone)

    return data


if __name__ == "__main__":
    # Daten generieren
    result = generate_data()
    
    # Als formatiertes JSON ausgeben
    print(json.dumps(result, indent=2, ensure_ascii=False))