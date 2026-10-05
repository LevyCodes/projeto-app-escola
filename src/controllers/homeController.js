class HomeController {
  index(req, res) {
    return res.render("home");
  }
}
export default new HomeController();
