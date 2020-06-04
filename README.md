# cooldash

inside folder cooldash 
`npm install package.json`
`npm run build`

outside cooldash folder, where Docker file resides.. 
- `docker build -f Dockerfile -t cooldash .`
- `docker login`
- `docker tag cooldash <user_name>/cooldash`
- `docker push <user_name>/cooldash`

go to aws - ecs 
- create task definition 
- create cluster 
- create service (make sure to set the port 80)
- go to public IP
