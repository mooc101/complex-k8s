
# Documentation

## Nginx configuration
![double-nginx](/docs/double-nginx.png)

## Dockerrun AWS configuration

### Docker Compose and Docker run Analogy

![docker-compose-analogy](/docs/docker-compose-analogy.png)

### Elastic Beanstalk and Elastic Container Service Interaction

![ecs](/docs/ecs.png)

[AWS ECS Task Definition](https://docs.aws.amazon.com/AmazonECS/latest/userguide/task_definition_parameters.html#container_definitions)

### Create links to client and server (container names) which are available by default in docker compose

![links](/docs/links.png)

## Persistent Storage PROD

![persistent-storage](/docs/persistent-storage.png)


### Need to link the container group to external persistent volumes for accessing them

![ext-pv-linkage](/docs/ext-pv-linkage.png)

Needs configuring of the security groups

### AWS - VPC, VPC Security Groups

![default-vpc](/docs/default-vpc.png)

![default-vpc-aws](/docs/default-vpc-aws.png)

Can't interact and only one security group aka firewall rule defined for EB instance

![security-group](/docs/security-group.png)

Configure Security group to accept requests from the same VPC

![same-vpc-security-group](/docs/same-vpc-security-group.png)

Steps:

    - Go to VPC
    - Select Security Groups
    - Create New Security group
    - Edit Rules
    - Choose correct security group in the "Source"(IP) option
    - Assign this newly created security group to RDS, ElastiCache and EBS
  
## Configuring ENV Vars for EBS

Steps:

    - Go to EBS
    - Select "Configuration" from the left side panel
    - Choose "Softwares" and press "Modify"
    - Enter the Environment Properties one by one
  