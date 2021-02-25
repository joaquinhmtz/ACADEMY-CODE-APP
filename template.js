function template(data) {
	var html = '';

	return {
		html :
      '<head>' +
        '<title>' + data.title + '</title>' +
        '<meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1">' +
        '<meta name="description" content="' + data.description + '">' +
        '<meta name="keywords" content="blog tecnologia, programacion, videojuegos"/>' +
        '<meta property="og:title" content="' + data.title + '" />' +
        '<meta property="og:description" content="' + data.description + '" />' +
        '<meta property="og:type" content="article" />' +
        '<meta property="og:url" content=" http://www.academy-code.com/article/get/' + data._id + '" />' +

        '<link rel="icon" type="image/x-icon" href="./assets/img/favicon.ico">' +
        '<link rel="preconnect" href="https://fonts.gstatic.com">' +
        '<link rel="preconnect" href="https://fonts.gstatic.com">' +
        '<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@100;300;500;900&display=swap" rel="stylesheet">' +
        '<link rel="stylesheet" href="./assets/font-awesome/css/font-awesome.min.css">'+
      '</head>'
	}
}

exports.template = template;
