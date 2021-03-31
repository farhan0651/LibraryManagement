    //Fetching name of the user
    fetch('/log/welcome')
    .then((res)=>{
    return (res.json());
    })  
    .then((res2)=>{
    let d=document.getElementById('wel')
    let n=`${res2.name}`;
    d.innerHTML+=n;
    return
    })

async function getBookDataSearch() {
    let titleOrName = document.getElementById('bookSearch').value;
    document.getElementById('homePageContent').innerHTML = "";
    titleOrName.trim();
    titleOrName.replace("/\s/g", '%20');
    let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${titleOrName}&startIndex=0`);
    console.log()
    const dataJson = await res.json();
    console.log(dataJson);
    let header = `
    <div class="page-title wb">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <h2><i class="fa fa-leaf bg-green"></i> Search results: ${titleOrName}</h2>
                </div><!-- end col -->
                <div class="col-lg-4 col-md-4 col-sm-12 hidden-xs-down hidden-sm-down">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Search results</a></li>
                        <li class="breadcrumb-item active">${titleOrName}</li>
                    </ol>
                </div><!-- end col -->                    
            </div><!-- end row -->
        </div><!-- end container -->
    </div><!-- end page-title -->`;
    document.getElementById('homePageContent').innerHTML = header;
    let containerForData = `
    <section class="section wb">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                    <div class="page-wrapper">
                        <div class="blog-list clearfix" id="searchDataCon">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
    document.getElementById('homePageContent').innerHTML += containerForData;
    if (dataJson != null && typeof dataJson != undefined && dataJson != "") {
        if (dataJson.totalItems == 0) {
            let noData = `
            <p>
                <h3><strong>Sorry... books with title ${titleOrName} are not available now</strong></h3>
            </p>
        `;
            document.getElementById('homePageContent').innerHTML = noData;
            return;
        }
        console.log(dataJson);
        dataJson['items'].forEach(function(data) {
            let dataForArray = `
            <div class="blog-box row">
                <div class="col-md-4">
                    <div class="post-media">
                        <a href="${data.volumeInfo.previewLink}" title="">
                            <img src="${data.volumeInfo.imageLinks.thumbnail}" alt="" class="img-fluid">
                            <div class="hovereffect"></div>
                        </a>
                    </div><!-- end media -->
                </div><!-- end col -->

                <div class="blog-meta big-meta col-md-8">
                    <span class="bg-aqua">${data.volumeInfo.categories}</span>
                    <span class="bg-aqua" onclick="addToFavourites('${data.id}')" id="${data.id}><i class="fa fa-heart"></i><a>Add to favourites</a></span> <br>
                    <span class="bg-aqua" onclick="delFromFavourites('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Delete from favourites</span> <br>
                    <span class="bg-aqua" onclick="addToBooksCart('${data.id}')" id="${data.id}><i class="fa fa-search"></i>Add to books cart</span> 
                    <span class="bg-aqua" onclick="delFromBooksCart('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Delete from books cart</span> <br>
                    <h4><a href="${data.volumeInfo.previewLink}" title="">${data.volumeInfo.title}: ${data.volumeInfo.subtitle}</a></h4>
                    <div style="height: 200px; overflow-y: scroll;">
                    <p>${data.volumeInfo.description}</p>
                    </div>
                    <small><a href="#" title=""> ${data.volumeInfo.publisher}</a></small>
                    <small><a href="#" title="">${data.volumeInfo.publishedDate}</a></small>
                    <small><a href="#" title="">Page Count:${data.volumeInfo.pageCount}</a></small>
                </div><!-- end meta -->
            </div>`;
            document.getElementById('searchDataCon').innerHTML += dataForArray;
        });
        let pager = `<br><br><input type="text" id="pageNo" placeholder="#" style="height:43px"><button id="naviTo" onclick="getBookDataPage();" class="btn btn-primary" style="margin-left: 5px">Enter</button>`;
        document.getElementById('searchDataCon').innerHTML += pager;
    } else {
        let noData = `
            <p>
                <h3><strong>Sorry... books with title ${titleOrName} are not available now</strong></h3>
            </p>
        `;
        document.getElementById('homePageContent').innerHTML = noData;
    }
}

async function getBookDataPage() {
    let titleOrName = document.getElementById('bookSearch').value;
    let pageNo = document.getElementById('pageNo').value;
    document.getElementById('searchDataCon').innerHTML = ""
    let startNo = pageNo * 10 - 1;
    titleOrName.trim();
    name.replace("/\s/g", '%20');
    let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${titleOrName}&startIndex=${startNo}`);
    const dataJson = await res.json();
    console.log(dataJson);
    if (dataJson != null && typeof dataJson != undefined && dataJson != "") {
        if (dataJson.totalItems == 0) {
            let noData = `
            <p>
                <h3><strong>Sorry... books with title ${titleOrName} are not available now</strong></h3>
            </p>
        `;
            document.getElementById('homePageContent').innerHTML = noData;
            return;
        }
        dataJson['items'].forEach(function(data) {
            let dataForArray = `
            <div class="blog-box row">
                <div class="col-md-4">
                    <div class="post-media">
                        <a href="${data.volumeInfo.previewLink}" title="">
                            <img src="${data.volumeInfo.imageLinks.thumbnail}" alt="" class="img-fluid">
                            <div class="hovereffect"></div>
                        </a>
                    </div><!-- end media -->
                </div><!-- end col -->

                <div class="blog-meta big-meta col-md-8">
                    <span class="bg-aqua"><a href="garden-category.html" title="">${data.volumeInfo.categories}</a></span>
                    <span class="bg-aqua" onclick="addToFavourites('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Add to favourites</span> <br>
                    <span class="bg-aqua" onclick="delFromFavourites('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Delete from favourites</span> <br>
                    <span class="bg-aqua" onclick="addToBooksCart('${data.id}')" id="${data.id}><i class="fa fa-search"></i>Add to books cart</span> 
                    <span class="bg-aqua" onclick="delFromBooksCart('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Delete from books cart</span> <br>
                    <h4><a href="garden-single.html" title="">${data.volumeInfo.title}: ${data.volumeInfo.subtitle}</a></h4>
                    <div style="height: 200px; overflow-y: scroll;">
                    <p>${data.volumeInfo.description}</p>
                    </div>
                    <small><a href="#" title=""><i class="fa fa-eye"></i> ${data.volumeInfo.publisher}</a></small>
                    <small><a href="#" title="">${data.volumeInfo.publishedDate}</a></small>
                    <small><a href="#" title="">${data.volumeInfo.pageCount}</a></small>
                </div><!-- end meta -->
            </div>
            <br>`;
            document.getElementById('searchDataCon').innerHTML += dataForArray;
        });
        let pager = `<br><br><input type="text" id="pageNo" placeholder="#" style="height:43px" value=${pageNo}><button id="naviTo" onclick="getBookDataPage();" class="btn btn-primary" style="margin-left: 5px">Enter</button>`;
        document.getElementById('searchDataCon').innerHTML += pager;
    } else {
        document.getElementById('searchDataCon').innerHTML = "";
        let noData = `
            <p>
                <h3><strong>Sorry... books with title ${titleOrName} are not available now</strong></h3>
            </p>
        `;
        document.getElementById('searchDataCon').innerHTML = noData;
    }
}

function addToFavourites(id) {
    location.assign('/log/addFav/' + id);
    alert("Book is added to Favourites");
}

function delFromFavourites(id) {
    location.assign('/log/delFav/' + id);
    alert("Book is deleted to Favourites");
}

function addToBooksCart(id) {
    location.assign('/log/addToCart/' + id);
    alert("Book is added to Favourites");
}

function delFromBooksCart(id) {
    location.assign('/log/delFromCart/' + id);
    alert("Book is deleted to Favourites");
}

async function showFav() {
    var xhttp = new XMLHttpRequest();
    let jo = {};
    let arrData = [];
    xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            jo = JSON.parse(this.responseText);
            console.log(jo);
            document.getElementById('homePageContent').innerHTML = "";
            let header = `
            <div class="page-title wb">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <h2><i class="fa fa-leaf bg-green"></i> Your Favourites</h2>
                        </div><!-- end col -->
                        <div class="col-lg-4 col-md-4 col-sm-12 hidden-xs-down hidden-sm-down">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item"><a href="#">Your Favourites</a></li>
                            </ol>
                        </div><!-- end col -->                    
                    </div><!-- end row -->
                </div><!-- end container -->
            </div><!-- end page-title -->`;
            document.getElementById('homePageContent').innerHTML = header;
            let containerForData = `
            <section class="section wb">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                            <div class="page-wrapper">
                                <div class="blog-list clearfix" id="searchDataCon">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;
            document.getElementById('homePageContent').innerHTML += containerForData;
            for (let i = 0; i < jo.arrList.length; i++) {
                let res = await fetch(`https://www.googleapis.com/books/v1/volumes/${jo.arrList[i]}`);
                let data = await res.json();
                let dataForArray = `
                <div class="blog-box row">
                    <div class="col-md-4">
                        <div class="post-media">
                            <a href="${data.volumeInfo.previewLink}" title="">
                                <img src="${data.volumeInfo.imageLinks.thumbnail}" alt="" class="img-fluid">
                                <div class="hovereffect"></div>
                            </a>
                        </div><!-- end media -->
                    </div><!-- end col -->

                    <div class="blog-meta big-meta col-md-8">
                        <span class="bg-aqua"><a href="#" title="">${data.volumeInfo.categories}</a></span>
                        <span class="bg-aqua" onclick="addToBooksCart('${data.id}')" id="${data.id}><i class="fa fa-search"></i>Add to books cart</span> 
                        <span class="bg-aqua" onclick="delFromBooksCart('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Delete from books cart</span> <br>
                        <h4><a href="${data.volumeInfo.previewLink}" title="">${data.volumeInfo.title}: ${data.volumeInfo.subtitle}</a></h4>
                        <div style="height: 200px; overflow-y: scroll;">
                        <p>${data.volumeInfo.description}</p>
                        </div>
                        <small><a href="#" title=""><i class="fa fa-eye"></i> ${data.volumeInfo.publisher}</a></small>
                        <small><a href="#" title="">${data.volumeInfo.publishedDate}</a></small>
                        <small><a href="#" title="">${data.volumeInfo.pageCount}</a></small>
                    </div><!-- end meta -->
                </div>
                <br>`;
                document.getElementById('searchDataCon').innerHTML += dataForArray;
            }

        }

    };
    xhttp.open("GET", "log/showFav", true);
    xhttp.send();
}

async function showCart() {
    var xhttp = new XMLHttpRequest();
    let jo = {};
    let arrData = [];
    xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            jo = JSON.parse(this.responseText);
            document.getElementById('homePageContent').innerHTML = "";
            let header = `
            <div class="page-title wb">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <h2><i class="fa fa-leaf bg-green"></i> Your Books Cart</h2>
                        </div><!-- end col -->
                        <div class="col-lg-4 col-md-4 col-sm-12 hidden-xs-down hidden-sm-down">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item"><a href="#">Your Books Cart</a></li>
                            </ol>
                        </div><!-- end col -->                    
                    </div><!-- end row -->
                </div><!-- end container -->
            </div><!-- end page-title -->`;
            document.getElementById('homePageContent').innerHTML = header;
            let containerForData = `
            <section class="section wb">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                            <div class="page-wrapper">
                                <div class="blog-list clearfix" id="searchDataCon">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;
            document.getElementById('homePageContent').innerHTML += containerForData;
            for (let i = 0; i < jo.arrList.length; i++) {
                let res = await fetch(`https://www.googleapis.com/books/v1/volumes/${jo.arrList[i]}`);
                let data = await res.json();
                let dataForArray = `
                <div class="blog-box row">
                    <div class="col-md-4">
                        <div class="post-media">
                            <a href="${data.volumeInfo.previewLink}" title="">
                                <img src="${data.volumeInfo.imageLinks.thumbnail}" alt="" class="img-fluid">
                                <div class="hovereffect"></div>
                            </a>
                        </div><!-- end media -->
                    </div><!-- end col -->

                    <div class="blog-meta big-meta col-md-8">
                        <span class="bg-aqua"><a href="#" title="">${data.volumeInfo.categories}</a></span>
                        <span class="bg-aqua" onclick="addToFavourites('${data.id}')" id="${data.id}><i class="fa fa-search"></i>Add to Favourites</span> 
                        <span class="bg-aqua" onclick="delFromFavourites('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Delete from Favourites</span> <br>
                        <h4><a href="${data.volumeInfo.previewLink}" title="">${data.volumeInfo.title}: ${data.volumeInfo.subtitle}</a></h4>
                        <div style="height: 200px; overflow-y: scroll;">
                        <p>${data.volumeInfo.description}</p>
                        </div>
                        <small><a href="#" title=""><i class="fa fa-eye"></i> ${data.volumeInfo.publisher}</a></small>
                        <small><a href="#" title="">${data.volumeInfo.publishedDate}</a></small>
                        <small><a href="#" title="">${data.volumeInfo.pageCount}</a></small>
                    </div><!-- end meta -->
                </div>
                <br>`;
                document.getElementById('searchDataCon').innerHTML += dataForArray;
            }

        }

    };
    xhttp.open("GET", "log/showCart", true);
    xhttp.send();
}