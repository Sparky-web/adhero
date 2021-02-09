import faunadb from 'faunadb'

const client = new faunadb.Client({secret: "fnAD8ALro7ACB8RvfhXxM9oAUqaQBBXH9VuNW6Lc"})
const q = faunadb.query

export {client, q}
