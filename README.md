## Create post

Utility for both https://github.com/chrissearle/www_cso/ and https://github.com/chrissearle/www_smu/

Expects to be checked out to thj same directory as www_cso/www_smu

SITE is either `cso` or `smu`

Create post that does not expect to have images - creates the directory, markdown file and basic greymatter:

```shell
./create.js -s SITE 'Title of post'
```

Create post that does expect to have images - creates the directory, markdown file and basic greymatter including an image line with correct prefix. Also creates image directory:

```shell
./create.js -is SITE 'Title of post'
```
