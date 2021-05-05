# Serverless Metadata Scrapper
#### Built on Serverless Framework

To Get Started:
1. Install Serverless Framework on your system: (To know more about serverless framework - https://www.serverless.com)

   ``` npm i serverless -g ```
2. To deploy the Application to AWS Lambda FaaS (Make sure you have aws-cli installed with access id and secret key configured. if not, kindly follow: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)- 
   
   ```sls deploy```
   This will deploy the entire infrastructure required by your code to run on AWS through IaC CloudFormation.
   For any change done at infrastructure level, kinldy redeploy the entire app.
   For any delta changes done to Lambda function:
   
   ```sls deploy -f <function name>```

##OG Metadata Scrapper
####This application takes url as body of POST request and returns open graph metadata information of that url.

Recommended to use Postman https://www.postman.com/

``` POST: {{url}}/metadata```

``` Body: { "url":"https://www.amazon.in/New-Apple-iPhone-12-128GB/dp/B08L5TNJHG" } ```

Response: 
```yaml
{
    "ogLocale": "en-us",
    "requestUrl": "https://www.amazon.in/New-Apple-iPhone-12-128GB/dp/B08L5TNJHG",
    "success": true,
    "charset": "utf8",
    "ogImage": [
        {
            "width": null,
            "type": "jpg",
            "url": "https://images-na.ssl-images-amazon.com/captcha/sargzmyv/Captcha_lkosukazkr.jpg",
            "height": null
        }
    ],
    "ogTitle": "Amazon.in"
}
