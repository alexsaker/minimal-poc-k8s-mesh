# Skyview POC

## Pre-requisites

```bash
Node.js needs to be installed
kubectl and kompose need to be deployed
```

## Launch project

```bash
npm i
npm run nx -- start app1
npm run nx -- start app2
curl http://localhost:4001/api/app1/timestamp
```

## Launch with docker-compose

```bash
docker-compose -f docker-compose-dev.yml up
```

## Building docker images and pushing them

```bash
docker build -f ./apps/app1/Dockerfile  -t asaker/app1:v1 .
docker push asaker/app1:v1
docker build -f ./apps/app2docker/Dockerfile  -t asaker/app2:v1 .
docker push asaker/app2:v1
```

## Convert docker-compose to chart

```bash
mkdir chart
cd chart
kompose -f ../docker-compose.yml convert
```

## Deploy and validate result

```bash
# Modify services and deployments accordingly removing network policies as it is not mandatory here and adding service account
cd ..
kubectl create ns demo
kubectl create sa skyview -n demo
# Add service account in deployment files
kubectl apply -f ./chart -n demo
# Check out result
kubectl get all -n demo
kubectl port-forward deploy/app1 -n demo 8000:4001
curl http://localhost:8000/api/app1/timestamp
```
