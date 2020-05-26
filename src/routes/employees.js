const express = require('express');
const router = express.Router();
const maridb = require('../database');

router.get('/', (req, res) => {
    maridb.then(async (connection) => {
      const empleados =  await connection.query('select * from employees')
      res.json(empleados);
    }).catch(err => console.log(err));    
})

router.get('/:id', (req,res) => {
   const {id} = req.params;
   console.log(id);
    maridb.then(async (connection) => {
        const empleyoe = await connection.query('select * from employees where id = ? ',[id]);
        res.json(empleyoe);
    }).catch(err => console.log(err))
});

router.post('/',(req,res) => {
    const {id ,name,salary} = req.body;
    _name = name;
    _salary = parseInt(salary)
    console.log(req.body);
    maridb.then(async (connetion) => {
     await connetion.query('INSERT INTO employees ( name, salary) VALUE (?,?)',[_name,_salary]).then(() => {
         console.log('********Todo en orden*********');
         res.json({Status: 'ok'})
     });

    });
});

router.put('/:id',(req,res) => {
    const {name, salary} = req.body;
    const {id} = req.params;

    maridb.then(async (connection) => {
        await connection.query('update employees set name = ? , salary = ? where id = ?;',[name,salary,id]).then(() => {
            console.log('********Todo en orden*********');
            res.json({Status: 'ok'});
        });
    }).catch(err => console.log(err));

});

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    maridb.then(async (connection) => {
    await connection.query('delete FROM employees where id = ?',[id]).then(() => {
            console.log('********Todo en orden*********');
            res.json({Status: 'ok'});
        });
    });
});
module.exports = router;