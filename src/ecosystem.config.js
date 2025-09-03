module.exports = {
  apps : [{
    name : 'task',
    script: 'schema/task/index.ts',
    watch: '[schema/task]',
    interpreter : 'node',
    interpreter_args : '-r ts-node/register'
  },{
    name : 'user',
    script: 'schema/user/index.ts',
    watch: '[schema/user]',
    interpreter : 'node',
    interpreter_args : '-r ts-node/register'
  }, {
    name : 'server',
    script: 'server.ts',
    watch: './',
    interpreter : 'node',
    interpreter_args : '-r ts-node/register'
  }]

};
