const readline = require('readline');
const Backup = require('./backup');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask (question) {
  return new Promise((resolve, reject) => {
    rl.question(`${question} `, answer => {
      const value = answer.trim();
      if (value === '') return reject(new Error('missing value'));
      return resolve(answer);
    });
  });
}

const Conversations = [
  { chatId: 'ID_FROM_URL', target: 'CONVERSATION_NAME' },
  { chatId: 'OTHER_ID_FROM_URL', target: 'OTHER_NAME' },
];

async function main () {
  const authToken = await ask('Enter JWT:');

  for (let conversation of Conversations) {
    console.log(`Fetching ${conversation.target}`);
    let backup = new Backup({
      chatId: conversation.chatId,
      authToken,
      target: `out/${conversation.target}`
    });

    await backup.run();
  }
}

main()
  .then(() => rl.close())
  .catch(err => {
    rl.close();
    console.error(err);
  });
