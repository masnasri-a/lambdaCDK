# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

# TUTORIALNYA

### syarat
- harus sudah punya akun AWS


install cdk
```
npm i -g cdk
```
install juga aws cli
```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

configure aws cli di local
```
aws configure
```
lalu isi sesuai akun aws kalian

buat directory buat testing
```
mkdir lambdaCDK
cd lambdaCDK
```
buat project cdk
```
cdk init app --language typescript
```
install beberapa library tambahan
```
npm i @aws-cdk/aws-lambda
npm i --save-dev esbuild@0
npm i @aws-cdk/aws-lambda-nodejs
```

harus buat template buat deployment denga cara bootstrap
```
cdk bootstrap aws://<aws account id>/<region>

contoh
cdk bootstrap aws://123456789012/us-east-1
```


buat folder dan file untuk tempat handler functionnya, contohnya saya namanya functions
```
mkdir functions
touch functions/function.ts
```
untuk contoh script buat di function.ts bisa copas di [function.ts](https://raw.githubusercontent.com/masnasri-a/lambdaCDK/main/functions/function.ts)

edit file didalam folder lib juga,
tambahkan
```
new NodejsFunction(this, 'cdkLambda',{
    functionName: "cdkLambdaTest",
    runtime: lambda.Runtime.NODEJS_14_X,
    entry: path.join(__dirname, `/../functions/function.ts`),
    handler: "handler",
    timeout:cdk.Duration.seconds(300)
})
```

kalau sudah, tinggal di synthesizes
```
cdk synth
```

kalau sukses tinggal deploy
```
cdk deploy
```

kalau berhasil maka akan seperti ini
![Success Images!](/public/4.png "Success Deploy")

terus buka akun aws, terus cari menu lambda

![Lambda Menu Images!](/public/5.png "Lambda Menus")

terus buka bagian function seperti gambar dibawah

![Lambda Menu Images!](/public/1.png "Lambda Menus")

selanjutnya kita buat trigger untuk mengakses function handler
klik add trigger
![Lambda Menu Images!](/public/2.png "Lambda Menus")

sebagai contoh tambahkan seperti pengaturan diatas

![Lambda Menu Images!](/public/3.png "Lambda Menus")

lalu klik API endpoint di browser, dan tambahkan parameter name
![Lambda Menu Images!](/public/6.png "Lambda Menus")

kalau muncul seperti gambar diatas berarti sukses