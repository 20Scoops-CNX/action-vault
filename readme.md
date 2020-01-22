# 20scoops Action Vault

## Feature available
 - [x] aws access key
 - [ ] KV key value
 - [ ] SSH private key

Usage
---
### AWS access key

```sh
jobs:
    build:
        steps:
            - name: Import AWS access key
              uses: 20Scoops-CNX/action-vault@master
              with:
                VAULT_HOST: ${{ secrets.VAULT_HOST }}
                VAULT_TOKEN: ${{ secrets.VAULT_TOKEN }}
                PATH: 'example-aws/creds/ecr'
                # aws,kv,ssh
                MODULE: 'aws'
              id: aws
            - name: Login to ECR
              id: ecr
              uses: jwalton/gh-ecr-login@v1
              with:
                access-key-id: ${{ steps.aws.AWS_ACCESS_KEY }}
                secret-access-key: ${{ steps.aws.AWS_SECRET_KEY }}
                region: ${REGION}
            
```

