docker build -t sandeshkumar/multi-client:latest -t sandeshkumar/multi-client:$GIT_SHA -f ./client/Dockerfile ./client
docker build -t sandeshkumar/multi-server:latest -t sandeshkumar/multi-server:$GIT_SHA -f ./server/Dockerfile ./server
docker build -t sandeshkumar/multi-worker:latest -t sandeshkumar/multi-worker:$GIT_SHA -f ./worker/Dockerfile ./worker

docker push sandeshkumar/multi-client
docker push sandeshkumar/multi-server
docker push sandeshkumar/multi-worker

docker push sandeshkumar/multi-client:$GIT_SHA
docker push sandeshkumar/multi-server:$GIT_SHA
docker push sandeshkumar/multi-worker:$GIT_SHA

kubectl apply -f k8s

kubectl set image deployments/client-deployment client=sandeshkumar/multi-client:$GIT_SHA
kubectl set image deployments/server-deployment server=sandeshkumar/multi-server:$GIT_SHA
kubectl set image deployments/worker-deployment worker=sandeshkumar/multi-worker:$GIT_SHA
