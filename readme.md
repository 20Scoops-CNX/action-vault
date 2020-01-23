# 20scoops Action Vault

| Statements | Branches | Functions | Lines |
| -----------|----------|-----------|-------|
| ![Statements](https://img.shields.io/badge/Coverage-93.55%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-75%25-red.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-93.55%25-brightgreen.svg "Make me better!") |


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
                access-key-id: ${{ env.AWS_ACCESS_KEY }}
                secret-access-key: ${{ env.AWS_SECRET_KEY }}
                region: ${REGION}
            
```

