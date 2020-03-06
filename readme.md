# 20scoops Action Vault

| Statements                                    | Branches                                  | Functions                                   | Lines                               |
| --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-79.22%25-red.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-62.5%25-red.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-50%25-red.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-80.26%25-yellow.svg "Make me better!") |


## Feature available
 - [x] aws access key
 - [x] KV key value
 - [x] SSH private key

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

### SSH vault Signed SSH Certificates
**Note**: How to and Concept of this module https://www.vaultproject.io/docs/secrets/ssh/signed-ssh-certificates

signed ssh certificates is how you do ssh to server from client side (CI) and excute the `shell` command to do something on server with this will need your current id_rsa and id_ras-cert.pub to verify host and get authorized and excution.

```yml
jobs:
    build:
        steps:
            - name: Show something on server
              uses: 20Scoops-CNX/action-vault@master
              with:
                VAULT_HOST: ${{ secrets.VAULT_HOST }}
                VAULT_TOKEN: ${{ secrets.VAULT_TOKEN }}
                PATH: 'my-ssh/sign/user'
                MODULE: 'ssh',
                COMMAND: 'ls -la'
```

