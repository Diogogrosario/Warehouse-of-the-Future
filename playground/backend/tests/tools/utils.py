import requests
import json

def fetch_expected_output(test_name, folder_path="./tests/resources"):
    with open(f"{folder_path}/{test_name}.json") as f:
        return json.load(f)
 
   
def get_req_assertion(url, status_code=200, expected=None):
    # Additional headers.
    headers = {'Content-Type': 'application/json' } 
    
    # convert dict to json string by json.dumps() for body data. 
    resp = requests.get(url, headers=headers)       
    
    # Validate response headers and body contents, e.g. status code.
    assert resp.status_code == status_code
    
    # convert response body to dictionary
    resp_json = json.loads(resp.text)

    # fetch expected response
    if expected:
        assert expected == resp_json
    
    return resp_json

def put_req_assertion(url, status_code=200, expected=None, data={}):
    # Additional headers.
    headers = {'Content-Type': 'application/json' } 
    
    # convert dict to json string by json.dumps() for body data. 
    resp = requests.put(url, headers=headers, data=json.dumps(data,indent=4))       
    
    # Validate response headers and body contents, e.g. status code.
    assert resp.status_code == status_code
    
    # convert response body to dictionary
    resp_json = json.loads(resp.text)

    # fetch expected response
    if expected:
        assert expected == resp_json
    
    return resp_json


def post_req_assertion(url, payload={}, expected=None):
    
    # Additional headers.
    headers = {'Content-Type': 'application/json' } 
    
    # convert dict to json string by json.dumps() for body data. 
    resp = requests.post(url, headers=headers, data=json.dumps(payload,indent=4))       
    
    # Validate response headers and body contents, e.g. status code.
    assert resp.status_code == 200
    
    # print response full body as text
    return json.loads(resp.text)


def delete_req_assertion(url, expected=None):
    # Additional headers.
    headers = {'Content-Type': 'application/json' } 
    
    # convert dict to json string by json.dumps() for body data. 
    resp = requests.delete(url, headers=headers)       
    
    # Validate response headers and body contents, e.g. status code.
    assert resp.status_code == 200
    
    resp_json = json.loads(resp.text)
    
    if expected:
        assert expected == resp_json
        
    # print response full body as text
    return resp_json
    