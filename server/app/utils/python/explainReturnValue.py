import sys
import json

def main():
    product = sys.argv[1]
    explaination = sys.argv[2]
    print json.dumps(explaination + ': ' + product)

if __name__ == "__main__":
    main()