rm -rf ./$1

mkdir ./$1 && cd ./$1 && pnpm init && tsc --init

echo "packages:
  - 'packages/*'" >./pnpm-workspace.yaml

echo "link-workspace-packages=true" >./.npmrc

mkdir ./packages

mkdir ./packages/pkg
mkdir ./packages/pkg/src
mkdir ./packages/pkg2
mkdir ./packages/pkg2/src

cd ./packages/pkg && pnpm init && cd -

cd ./packages/pkg2 && pnpm init && cd -

echo "export function pkg() { console.log('pkg') }" >./packages/pkg/src/index.ts

echo "export function pkg2() { console.log('pkg2') }" >./packages/pkg2/src/index.ts
