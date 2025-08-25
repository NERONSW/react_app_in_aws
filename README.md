# **Sample App using React (Vite) and AWS Services**

This project demonstrates how to build and deploy a sample application using **React (Vite)** for the frontend and **AWS Cloud Services** for the backend.

---

## **Tech Stack**

- **Frontend**: React (Vite)
- **Backend**: AWS Lambda
- **API Gateway**: Amazon API Gateway
- **Database**: Amazon DynamoDB
- **Hosting**: AWS Amplify

---

## **Project Overview**

The app uses:

- **React with Vite** for a fast and optimized frontend.
- **AWS Lambda** for serverless backend logic.
- **Amazon API Gateway** to expose Lambda functions via HTTP endpoints.
- **Amazon DynamoDB** to store and retrieve data.
- **AWS Amplify** for hosting and deploying the frontend.

---

## **Setup Guide**

### **1. Create the React App using Vite**

```bash
# Create a new Vite app
npm create vite@latest my-app
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

---

### **2. Backend Setup with AWS Lambda and API Gateway**

#### **a. Create Lambda Function**

- Go to **AWS Lambda Console** and create a new function.
- Choose **Node.js runtime**.
- This function will interact with **DynamoDB**.

#### **b. Install AWS SDK for Lambda**

Since Lambda does not include the latest modular AWS SDK by default:

```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

#### **c. Configure Lambda Layer**

- Create a `package.json` file for your Lambda layer:

```json
{
  "name": "lambda-layer",
  "version": "1.0.0",
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.x",
    "@aws-sdk/lib-dynamodb": "^3.x"
  },
  "type": "module"
}
```

- Zip the `node_modules` and attach the layer to your Lambda function.

#### **d. Example Lambda Code**

```javascript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async () => {
  const params = {
    TableName: "SampleTable",
    Item: { id: "123", name: "Test User" },
  };

  await docClient.send(new PutCommand(params));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Data inserted successfully" }),
  };
};
```

---

### **3. Create API Gateway Endpoint**

- Create a **REST API** or **HTTP API** in **Amazon API Gateway**.
- Integrate the API with your Lambda function.
- Enable **CORS**:

```
Access-Control-Allow-Origin: https://your-app.amplifyapp.com
```

- Deploy the API and copy the **Invoke URL**.

---

### **4. Connect React Frontend to API Gateway**

- Add the API Gateway URL to `.env`:

```env
VITE_API_BASE_URL=https://your-api-id.execute-api.region.amazonaws.com/dev
```

- Use it in your React app:

```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchData() {
  const response = await fetch(`${API_URL}/your-endpoint`);
  const data = await response.json();
  console.log(data);
}
```

---

### **5. Deploy Frontend on AWS Amplify**

1. Push your React project to **GitHub**.
2. In **AWS Amplify Console**, select **Connect App**.
3. Choose the GitHub repo and branch.
4. Add `VITE_API_BASE_URL` as an **environment variable** in Amplify.
5. Deploy and get your live URL.

---

## **AWS Services Used**

✅ **AWS Lambda** – Serverless compute for backend logic
✅ **Amazon API Gateway** – Exposes Lambda functions as REST APIs
✅ **Amazon DynamoDB** – NoSQL database for data storage
✅ **AWS Amplify** – Frontend hosting and deployment

---

### **Live Demo**

> [React-App-With-AWS-Services](https://main.dc9fiyiky62rj.amplifyapp.com/)
