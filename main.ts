// import { Construct } from "constructs";
// import { App, TerraformStack } from "cdktf";

// class MyStack extends TerraformStack {
//   constructor(scope: Construct, id: string) {
//     super(scope, id);

//     // define resources here
//   }
// }

// const app = new App();
// new MyStack(app, "TERRAFORM-TS");
// app.synth();

// Import necessary constructs from cdktf
import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";

// Import Docker constructs from @cdktf/provider-docker
import { DockerProvider } from "@cdktf/provider-docker/lib/provider";
import { Image } from "@cdktf/provider-docker/lib/image";
import { Container } from "@cdktf/provider-docker/lib/container";

// Define a custom Terraform stack using the TerraformStack class
class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    // Call the constructor of the base class (TerraformStack)
    super(scope, name);

    // Create a Docker provider named "docker" within the stack
    new DockerProvider(this, "docker", {});

    // Define a Docker image named "nginxImage"
    const dockerImage = new Image(this, "nginxImage", {
      name: "nginx:latest",
      keepLocally: false,
    });

    // Create a Docker container named "nginxContainer" using the defined image
    new Container(this, "nginxContainer", {
      name: "tutorial",
      image: dockerImage.name,
      ports: [
        {
          internal: 80,
          external: 8000,
        },
      ],
    });
  }
}

// Create an instance of the CDK for Terraform App
const app = new App();

// Instantiate and deploy the custom stack ("MyStack") within the app
new MyStack(app, "learn-cdktf-docker");

// Synthesize the Terraform configuration and generate HCL files
app.synth();

