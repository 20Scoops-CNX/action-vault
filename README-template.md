# 20scoops Action Vault

| Statements | Branches | Functions | Lines |
| -----------|----------|-----------|-------|
| ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") |


## Feature available
 - [x] aws access key
 - [x] KV key value
 - [ ] SSH private key

Usage
---
### AWS access key

```yml
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

### Secrets KEY/VALUE
**Note** : this module required secrets `V1`

Key value type in this module need to precise to actual path such as `my-secret/develop` this example path will contain with various variable such a `host`, `url`, `host_token`, etc.. as we specify in vault secrets and this will export those variable to env variable for use in next steps.

```yml
  run: |
    echo ${{ env.host }}
    echo ${{ env.url }} 
    echo ${{ env.host_token }}
```

```yml
jobs:
    build:
        steps:
            - name: Import Secrets key
              uses: 20Scoops-CNX/action-vault@master
              with:
                VAULT_HOST: ${{ secrets.VAULT_HOST }}
                VAULT_TOKEN: ${{ secrets.VAULT_TOKEN }}
                PATH: 'my-project/DEVELOP'
                MODULE: 'kv'
              id: my-secret
```

