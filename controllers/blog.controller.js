const { Blog } = require("../models/blog.model");

const blogIndex = (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.render("blog/index", { blogs });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
};

const blogCreateGet = (req, res) => {
  res.render("blog/new");
};

const blogCreatePost = async (req, res) => {
  const { title, body } = req.body;

  if (title && body) {
    const blog = new Blog({ body, title, author: req.author._id });
    try {
      await blog.save();
      res.redirect("/blog");
    } catch (err) {
      console.error(err);
    }
  }
};

const blogDetails = (req, res) => {
  const { id } = req.params;
  // const id = req.params.id;
  Blog.findById(id)
    .then((blog) => res.render("blog/detail", { blog }))
    .catch((err) => console.error(err));
};

const blogEditGet = (req, res) => {
  const { id } = req.params;

  Blog.findById(id)
    .then((blog) => {
      if (blog.author === req.author._id) res.render("blog/edit", { blog });
      else {
        req.flash("error_msg", "Not Authorized");
        res.redirect("/blog");
      }
    })
    .catch((err) => console.error(err));
};

const blogEditPut = (req, res) => {
  const { id } = req.params;

  const { body, title } = req.body;

  if (body && title) {
    Blog.findById(id)
      .then((blog) => {
        if (blog.author === req.author._id) {
          blog.title = title;
          blog.body = body;
          blog
            .save()
            .then((_) => res.redirect(`/blog/${id}`))
            .catch((err) => {
              console.error(err);
              res.status(500).send();
            });
        } else {
          req.flash("error_msg", "Not Authorized");
          res.redirect("/blog");
        }
      })
      .catch((err) => console.error(err));
  }
};

// blog.remove()
const blogDelete = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.author.equals(req.author._id)) {
    await blog.remove();
    res.redirect("/blog");
  } else {
    req.flash("error_msg", "Not Authorized");
    res.redirect("/blog");
  }
};

module.exports = {
  blogIndex,
  blogCreateGet,
  blogCreatePost,
  blogDetails,
  blogEditGet,
  blogEditPut,
  blogDelete,
};
