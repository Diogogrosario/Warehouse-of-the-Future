import requests
import json
from tools.utils import *

BASE_URL = "http://localhost:3001"

def test_retrieve_all_reports():
    """Test to retrieve every report."""
    # get expected output from file
    resp = get_req_assertion(f'{BASE_URL}/report')
    assert len(resp) > 0

def test_get_specific_report():
    """Test to retrieve report with ID: 1"""
    
    resp = get_req_assertion(f'{BASE_URL}/report/1')
    assert resp["id"] == 1
    
def test_report_not_found():
    """Test retrieving an report that does not exist"""
    
    expected = {"message":"Didn't find report 999999999."}
    _ = get_req_assertion(f'{BASE_URL}/report/999999999', status_code=404, expected=expected)
    
def test_create_report():
    """Test creating a report."""
    payload={
        "severity":"error",
        "title":"Test Error",
        "description":"This is a test report."
    }
    resp = post_req_assertion(f'{BASE_URL}/report', payload=payload)
    assert resp["severity"] == payload["severity"]
    assert resp["title"] == payload["title"]
    assert resp["description"] == payload["description"]
    
# Not supported for now
def test_update_report():
    """Test updating a report."""
    data={
        "severity" : "warning"
    }
    resp = put_req_assertion(f'{BASE_URL}/report/1', data=data)
    assert resp["severity"] == data["severity"]

    
def test_delete_report():
    """Test deleting a report"""   
    _resp = delete_req_assertion(f'{BASE_URL}/report/2', expected={'message': 'Success.'})
    
def test_delete_all_reports():
    """Test delete all reports"""
    _resp = delete_req_assertion(f'{BASE_URL}/report', expected={'message': 'Success.'})
    
    
if __name__ == "__main__":
    test_retrieve_all_reports()
    test_get_specific_report()
    test_report_not_found()
    test_create_report()
    test_delete_report()
    test_update_report()
    test_solve_report()
    test_delete_all_reports()