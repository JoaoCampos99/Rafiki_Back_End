const { User } = require("../models/users.model");
const { Thread } = require("../models/threads.model");
const { Answer } = require("../models/answers.model");
const { Comment } = require("../models/comments.model");

var nodemailer = require("nodemailer");

let crudUser = {
  // registerUser(res, user) {
  //   User.create(user, (err, user) => {
  //     if (err) throw err
  //     res.json({ msg: "success", user: user })
  //   })
  // },
  findAll(res) {
    try {
      User.find({}, (err, collection) => {
        if (err) {
          console.log(err, "erro");
        } else {
          // console.log(collection, "collection");
          res.json(collection);
        }
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find users" + err });
    }
  },
  findByRank(res) {
    try {
      let users = [];
      User.find({}, (err, collection) => {
        if (err) {
          console.log(err, "ERRO");
        } else {
          users = collection.sort((a, b) => {
            if (a.experience > b.experience) return -1;
            if (a.experience < b.experience) return 1;
            else return 0;
          });
          console.log(collection, "collection");
          res.json(users);
        }
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find users" + err });
    }
  },
  findByID(res, id) {
    try {
      User.find({ id: id }, (err, collection) => {
        if (err) console.log(err);
        res.json(collection[0]);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find users" + err });
    }
  },
  findOneByName(res, name) {
    try {
      //Encontrar o user e devolve-lo
      User.find(
        { name: { $regex: name, $options: "i" } },
        (err, collection) => {
          if (err) {
            console.log(err, "erro no findOneByName()");
          } else {
            res.json(collection);
          }
        }
      );
    } catch (err) {
      return res.status(400).send({ error: "Could not find users" + err });
    }
  },
  findOneByEmail(res, mail) {
    try {
      //Encontrar user e devolver-lo
      User.findOne({ email: mail }, (err, collection) => {
        if (err) {
          console.log(err, "Erro em findOneByEmail()");
        } else {
          res.json(collection);
        }
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find users" + err });
    }
  },
  updateUser(res, id, updateuser) {
    try {
      //Encontrar user e atualizar
      //Deve vir um novo objecto user e faz se overwrite do user atual
      //Vai ser assim que se vai fazer o update do follow e das notificações
      let query = { id: id };
      console.log(updateuser, "Este é u user no updateUser !!!!!!!!!!!!!!!");
      User.findOne(
        query,
        (err, user) => {
          if (err) throw err;
          user.name = updateuser.name
          user.picture = updateuser.picture
          user.year = updateuser.year
          user.course = updateuser.course
          user.description = updateuser.description
          console.log(user, "AAAAA")
          user.save(err => {
            if (err) throw err
            res.json({ msg: "Bem updatado", success: true })
          })
        }
      );
      // console.log(a, 'a')
    } catch (err) {
      return res.status(400).send({ error: "Could not update user" + err });
    }
  },
  /** Controllers para a página ViewProfile */
  addFollow(res, id, follow) {
    try {
      let query = { id: id };
      User.findOne(query, (err, user) => {
        if (err) throw err;
        /** Fazer push do id da thread a seguir pelo user */
        console.log(user.follow, "Array de followers do usaer " + user.name);
        /** Esta verificação só vai bser feita mesmo para despistar qualquer erro,´
         * porque esta verificação também vai ser feita no front-end
         */
        for (let i = 0; i < user.follow.length; i++) {
          if (user.follow[i] == follow) {
            res.json({
              msg: "That thread is already being followed",
              success: false
            });
            return;
          }
        }
        user.follow.push(follow);
        user.save(err => {
          res.json({ msg: "success", success: true });
        });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not update user" + err });
    }
  },
  removeFollow(res, id, follow) {
    try {
      User.findOne({ id: id }, (err, user) => {
        let existe = true;
        if (err) throw err;
        let index = user.follow.findIndex(fol => fol == follow);
        if (index != -1) user.follow.splice(index, 1);
        else existe = false;
        user.save(err => {
          if (err)
            res.json({
              msg: "Ocorreu um erro a gravar o user",
              success: false
            });
          res.json({
            msg: existe ? "Success" : "O user não segue essa thread",
            success: true,
            user: user
          });
        });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not update user" + err });
    }
  },
  addExperience(res, id, exp) {
    try {
      User.findOneAndUpdate(
        { id: id },
        { $inc: { experience: exp } },
        (err, user) => {
          if (err) throw err;
          res.json({
            msg: `foi adicionada ${exp} de exp ao user`,
            user: user,
            success: true
          });
        }
      );
    } catch (err) {
      return res.status(400).send({ error: "Could not update user" + err });
    }
  },
  removeExperience(res, id, exp) {
    try {
      User.findOneAndUpdate(
        { id: id },
        { $inc: { experience: -exp } },
        (err, user) => {
          if (err) throw err;
          res.json({
            msg: `foi removida ${exp} de exp ao user`,
            user: user,
            success: true
          });
        }
      );
    } catch (err) {
      return res.status(400).send({ error: "Could not update user" + err });
    }
  },
  deleteUser(res, id) {
    try {
      User.findOneAndRemove({ id: id }, (err, resp) => {
        if (err) throw err;
        console.log("User Deleted");
        let success = true;
        res.json({ success: success });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not delete user" + err });
    }
  },
  contact(req, res) {
    try {
      if (req.body.email !== undefined) {
        var emailAddres = req.body.email;
        var transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "rafikiteam18.19@gmail.com", //Mail
            pass: "Rafiki1234!" //Password
          }
        });
        var html = `<p>${req.body.name}</p>
                <p>${req.body.message}</p>
      `;
        var options = {
          from: emailAddres,
          to: "rafikiteam18.19@gmail.com",
          subject: req.body.subject,
          html: html
        };
        transporter.sendMail(options, function (err, info) {
          if (err) {
            console.log(err);
            res.json({ yo: "error" });
          } else {
            console.log("Message sent" + info.response);
            res.json({ yo: info.response });
          }
        });

        res.send(`<p>Mail Sent Subject:${req.body.subject}</p>`);
      } else {
        res.send("Email address is missing");
      }
    } catch (err) {
      return res.status(400).send({ error: "Could not contact" + err });
    }
  },
  addUpvote(res, id, upvote) {
    try {
      User.findOne({ id: id }, (err, user) => {
        /** Não deve ter mal fazer outra comfimação para ver se o user
         * já não deu upvote ao que vai dar upvote
         */
        if (err) throw err; // Porque assim sabemos diferenciar os erros penso eu de que, (bem xD)
        let insert = true;
        for (let upv of user.upvotes) {
          if (upv.type == upvote.type && upv.targetId == upvote.targetId) {
            res.json({
              msg: `já deu upvote nesta ${upvote.type}`,
              success: false
            });
            insert = false;
            return;
          }
        }

        if (insert) {
          user.upvotes.push(upvote);
          user.save(err => {
            if (err)
              res.json({
                msg: "Ocorreu um erro a gravar o user",
                success: false
              });
            res.json({ msg: "Upvote inserido com sucesso", success: true });
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  removeUpvote(res, id, upvote) {
    User.findOne({ id: id }, (err, user) => {
      if (err) throw err;
      let index = user.upvotes.findIndex(upv => {
        console.log(upvote, upv);
        if (upv.type == upvote.type && upv.targetId == upvote.targetId) {
          return true;
        }
        return false;
      });
      if (index != -1) {
        user.upvotes.splice(index, 1);
        user.save(err => {
          if (err)
            res.json({
              msg: "Ocorreu um erro ao gravar o user",
              success: true
            });
          res.json({ msg: "Upvote eliminado com sucesso", success: true });
        });
      } else {
        res.json({
          msg: `O user ainda não deu upvote nesta ${upvote.type}`,
          success: false
        });
      }
    });
  },
  updateNotification(res, userId, id) {
    try {
      User.findOne({ id: userId }, (err, user) => {
        console.log(user, "USEEEEER");
        if (err) res.json({ msg: "Algo correu mal", success: false });
        let noti = null;
        let index = user.notifications.findIndex(
          notification => notification.id == id
        );
        console.log(index, "INDEX");
        if (index != -1) {
          noti = user.notifications[index];
          noti.visto = true;
          console.log(user.notifications, "Notifications");
        }
        console.log(user, "LINHA 339");
        user.notifications.splice(index, 1);
        user.notifications.push(noti);
        user.save(err => {
          if (err) throw err;
          res.json({
            msg: `Notificação adicionada ao ${user.name}`,
            success: true,
            user: user
          });
        });
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Could not update notification" + err });
    }
  },
  addNotification(res, id, notification) {
    try {
      User.findOne({ id: id }, (err, user) => {
        if (err) throw err;
        console.log(user, "USEEEEEEEER");
        if (user.notifications.length != 0) {
          let notifications = user.notifications.sort((a, b) => {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            else return 0;
          });
          let id = notifications[notifications.length - 1].id + 1;
          notification.id = id;
        } else {
          notification.id = 1;
        }

        user.notifications.push(notification);
        user.save(err => {
          if (err) throw err;
          res.json({
            msg: `Notificação adicionada ao ${user.name}`,
            success: true
          });
        });
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Could not add notification" + err });
    }
  },
  /** Fazer um para remover notificaçoes (boa cena para o user) */

  //Fucking Working
  addMultipleNotifications(res, threadId, notification) {
    try {
      User.find({}, (err, users) => {
        for (let us of users) {
          if (us.follow.length != 0) {
            for (let fol of us.follow) {
              if (fol == threadId) {
                let id =
                  us.notifications.length == 0
                    ? 1
                    : us.notifications[us.notifications.length - 1].id + 1;
                console.log(id, "ID!!!!!!!!!!!!!!!1");
                if (!id) id = 1;
                notification.id = id;
                console.log(notification, "LALALALALALALALALALALALALA");
                us.notifications.push(notification);
                us.save(err => {
                  if (err) throw err;
                });
              }
            }
          }
        }
        res.json({ msg: "done", success: true });
      });
    } catch (err) {
      throw err;
    }
  },
  deleteNotification(res, id, notificas) {

    User.findOne({ id: id }, (err, user) => {
      if (err) throw err;
      console.log(user.notifications, "OAOAOAOAOAOAOAOAO")
      for (let notification of notificas) {
        let index = user.notifications.findIndex(not => {
          if (not.id != undefined) {
            not.id == notification;
            return true;
          }
          return false;
        });
        if (index != -1) {
          user.notifications.splice(index, 1)
        }
      }

      user.save(err => {
        if (err) throw err;
        res.json({ msg: "Boa", success: true });
      });
    })
  },
  updateUserInfoLitl(res, userid, info) {
    async function update() {
      try {
        /** TEstar calarho */
        /** Update userInfo nas threads */
        await Thread.find({ 'userInfo.userid': userid }, (err, collection) => {
          if (err) throw err;
          for (let i = 0; i < collection.length; i++) {
            if (info.name != null) {
              collection[i].userInfo.name = info.name
            }
            if (info.photo != null) {
              collection[i].userInfo.photo = info.photo
            }
            if (info.rank != null) {
              collection[i].userInfo.rank = info.rank
            }
            collection[i].save(err => {
              if (err) throw err
              return
            })
          }
        })

        /** Update userInfo nas Answers */
        await Answer.find({ 'userInfo.userid': userid }, (err, collection) => {
          if (err) throw err;
          for (let i = 0; i < collection.length; i++) {
            if (info.name != null) {
              collection[i].userInfo.name = info.name
            }
            if (info.photo != null) {
              collection[i].userInfo.photo = info.photo
            }
            if (info.rank != null) {
              collection[i].userInfo.rank = info.rank
            }
            collection[i].save(err => {
              if (err) throw err
              return
            })
          }
        })

        /** Update userInfo nos Comments */
        await Comment.find({ 'userInfo.userid': userid }, (err, collection) => {
          if (err) throw err;
          for (let i = 0; i < collection.length; i++) {
            if (info.name != null) {
              collection[i].userInfo.name = info.name
            }
            if (info.photo != null) {
              collection[i].userInfo.photo = info.photo
            }
            if (info.rank != null) {
              collection[i].userInfo.rank = info.rank
            }
            collection[i].save(err => {
              if(err) throw err
              return
            })
          }
        })
        return 
      }
      catch (err) {
        throw err
      }
    }
    update().then(resp => res.json({msg: "User Info was updated", success: true}))
  }
};

module.exports = crudUser;

/*isBurnedUpv(res, id, upvote) {
  let burned = false
  User.findOne({ id: id }, (err, user) => {
    if (err) throw err;
    console.log(user.burnedUpvotes, "BURNNNNNNNNNNNNNN||!!!!!!!!!!!!")
    if (user.burnedUpvotes == undefined) user.burnedUpvotes = []
    for (let upv of user.burnedUpvotes) {
      if (upv.threadId == upvote.threadId && upv.answerId == upvote.answerId && upv.commentId == upvote.commentId && upv.userId == upvote.userId) {
        res.json({ msg: "Burned", isBurned: true })
        burned = true
        return
      }
    }
    if (!burned) {
      console.log(upvote)
      user.burnedUpvotes.push(upvote)
      User.findOneAndUpdate({ id: id }, { $set: { burnedUpvotes: user.burnedUpvotes } }, { useFindAndModify: false, overwrite: true },
        (err, newUser) => {
          if (err) throw err;
          res.json({ msg: "Not Burned", isBurned: false, userModi: newUser })
        })
    }
  })
},
isBurnedFollow(res, id, follow) {
  let burned = false
  User.findOne({ id: id }, (err, user) => {
    if (err) throw err;
    console.log(user.burnedFollow, "Burn FolloW!!!!!!!!!!!!!!!!!!!");
    if (user.burnedFollow == undefined) user.burnedFollow = []
    for (let fol of user.burnedFollow) {
      if (fol.userId == follow.userId && fol.threadId) {
        res.json({ msg: "Burned", isBurned: true })
        burned = true
        return;
      }
    }
    if (!burned) {
      console.log(follow)
      user.burnedFollow.push(follow)
      User.findOneAndUpdate({ id: id }, { $set: { burnedFollow: user.burnedFollow } }, { useFindAndModify: false, overwrite: true },
        (err, newUser) => {
          if (err) throw err;
          res.json({ msg: "Not Burned", isBurned: false, userModi: newUser })
        })
    }
  })
}*/
