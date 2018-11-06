import igdb from 'igdb-api-node';
const client = igdb('b0e6353cdadb85ab1d11bcc5341f5963');

client.games({
  fields: '*', // Return all fields
  limit: 5, // Limit to 5 results
  offset: 15 // Index offset for results
}).then(response => {
  // response.body contains the parsed JSON response to this query
  console.log(response.body)
}).catch(error => {
  throw error;
});