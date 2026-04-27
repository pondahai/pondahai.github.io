import urllib.request
import json
import sys

try:
    url = 'https://api.github.com/repos/pondahai/pondahai.github.io/actions/runs?status=failure&per_page=1'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        if not data.get('workflow_runs'):
            print("No failed workflow runs found.")
            sys.exit(0)
            
        run_id = data['workflow_runs'][0]['id']
        html_url = data['workflow_runs'][0]['html_url']
        print(f"Failed Run ID: {run_id}")
        print(f"URL: {html_url}")
        
        jobs_url = f'https://api.github.com/repos/pondahai/pondahai.github.io/actions/runs/{run_id}/jobs'
        req_jobs = urllib.request.Request(jobs_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req_jobs) as jobs_response:
            jobs_data = json.loads(jobs_response.read().decode())
            
            for job in jobs_data.get('jobs', []):
                if job['conclusion'] == 'failure':
                    print(f"\nJob Failed: {job['name']}")
                    for step in job.get('steps', []):
                        if step['conclusion'] == 'failure':
                            print(f"  Step Failed: {step['name']}")
                            print(f"  Status: {step['status']}")

except Exception as e:
    print(f"Error: {e}")
