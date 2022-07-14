import {
  ContainerInstanceManagementClient,
  ContainerGroup,
} from "@azure/arm-containerinstance";

export const containerGroup = async (
  client: ContainerInstanceManagementClient,
  resourceGroupName: string,
  containerGroupName: string,
  location: string
) => {
  const groupParameter: ContainerGroup = {
    location,
    osType: "Linux",
    containers: [
      {
        name: "test-container-sdk",
        image: "mcr.microsoft.com/azuredocs/aci-helloworld:latest",
        resources: {
          requests: {
            cpu: 1,
            memoryInGB: 1.5,
          },
        },
      },
    ],
  };

  const group = await client.containerGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    containerGroupName,
    groupParameter
  );
  console.log(group);
  return group;
};
