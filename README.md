# Click-Through Simulations Repo

This repository is used for hosting click-through simulation files that are embedded in learn content. The click-through files are expected to be put into the `docs` folder and should be grouped by the course number.

Example,
```
/ms-100/m2-l1-e2-t2/index.html
```

## Usage

After uploading the click-through files, a public accessible URL is generated. To access the files, add the root URL `https://microsoftlearning.github.io/click-throughs/docs/` and specify the folder you organized, as shown below:

```
https://microsoftlearning.github.io/click-throughs/docs/ms-100/m2-l1-e2-t2/index.html
```

To embed the click-through links in your learn content, use the link and append the parameter `?azure-portal=true` so that it opens in a new tab.

```
https://microsoftlearning.github.io/click-throughs/docs/ms-100/m2-l1-e2-t2/index.html?azure-portal=true
```

Please ensure that the click-through files are organized by course number to make it easier for users to find the relevant files.