# DSS Deployment Auth Viz

A tool to visualize and understand the permissions created when deploying the DSS system.

## Deployment

### Commands
- `yarn install`
- `yarn start <CUSTOM/PATH/TO/TESTCHAIN>`
- `yarn paint <CUSTOM/PATH/TO/TESTCHAIN>`

### Prerequisites

You need to have run [`testchain-dss-deployment-scripts`](https://github.com/makerdao/testchain-dss-deployment-scripts)

#### Example

1. `git clone git@github.com:makerdao/testchain-dss-deployment-scripts.git` && `cd testchain-dss-deployment-scripts`
2. in another shell `dapp testchain`
3. `nix-shell`
4. (inside `nix-shell`) `./step-1-deploy`
5. in another shell `cd` into this repo's directory and run `yarn install`
6. run `yarn paint ../testchain-dss-deployment-scripts` (where `../testchain-dss-deployment-scripts` is the path to the `testchain-dss-deployment-scripts` directory where you just ran `nix-shell` & `./step-1-deploy`)

This will result in a console output of the `digraph` as well as the creation of `graph.svg` in the project root dir.

### Output

- `yarn start <PATH/TO/TESTCHAIN>`
  - Count of events found per contract (i.e. `found 11 rely events for vat`)
  - `console.log` of the `digraph` which you can copy
  - warning about unused addresses if there are addresses in the `testchain-dss-deployment-scripts/out/addresses.json` file that are not accounted for in this tool
  - warning about missing nodes when creating connections (i.e. we pick up on an auth event but have not created that node in the graph already).  This will add a node with just the address so we can still graph the relationship.
- `yarn paint <PATH/TO/TESTCHAIN>`
  - all of the above, plus
  - `graph.svg` in the project root that renders the `digraph` visually.

### Optional flags

`ETH_RPC_URL`: to override the default `http://localhost:8545`
`process.argv[2]` || `TESTCHAIN_PATH`: to override the default testchain directory (`../testchain-dss-deployment-scripts`)
