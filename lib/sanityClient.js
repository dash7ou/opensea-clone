import sanityClient from "@sanity/client";

export const client = sanityClient({
    projectId: "8d0x8uzz",
    dataset: "production",
    apiVersion: "2021-03-25",
    useCdn: false,
    token: "skHAl1hGtSPQAXggMsuoN4E8RTHFqGSEMNHxBDV8oKbkWgQxeyaa7Rv2LXSy0RroX5o0Q6Dplvqvstwsm7jCjvLUmC7DrP2Qs8ALVRJPw9oXn15a2gMuv6WYbK0DdQVUv6vSPDsTkW7lbpidwp9SyLSr0ffVw4BLV3XNpeebQ1CXvqUZruHy"
})