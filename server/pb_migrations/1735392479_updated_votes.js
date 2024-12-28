/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2597176356")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id = user"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2597176356")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id = @request.body.user.id"
  }, collection)

  return app.save(collection)
})
