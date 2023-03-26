const Product = require('../module/product')

const getForm = (req,res,next)=>{
    res.render('admin/edit-product', {
        path:'admin/add-product',
        title:'add-product',
        editing:false
    })
}


const redirectHome = (req,res,next)=>{
    // console.log(req.body.product)
    // const products = new Products(null, req.body.name, req.body.description, req.body.imageUrl, req.body.amount)
    const title = req.body.name;
    const description = req.body.description
    const imageUrl = req.body.imageUrl
    const price = req.body.amount
    
    
    const product = new Product({
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl,
        userId: req.user
    })
    product.save()
    .then(data=>{
        console.log('Product created')
        // console.log(data)
        res.redirect('/')
    })
    
    .catch(err=>{
        console.log(err)
    })
  
    
}


const getAllProducts = function(req, res, next){
    Product.find()
    // .select('title price')
    // .populate('userId')
         .then(products=>{
            // console.log(products)
        res.render('admin/all-product',{
        products:products,
        path : 'admin/all-products',
        title:'all-product'
    })
     }).catch(err=>console.log(err))

     
}


const getEditProductPage = function(req,res,next){
    const editMode = req.query.edit

    if(editMode==='false'){
       return res.redirect('/')
    }

    const productId = req.params.productId
    
    Product.findById(productId)
    .then(product=>{
        
        
        if(!product){
            return
        }


        res.render('admin/edit-product',{
        title:'edit-product',
        path:'admin/edit-product',
        editing:editMode,
        product:product
    })
    }).catch(err=>console.log(err))

    

    
}



const editProductItem = function(req,res,next){
    const title = req.body.name
    const imageUrl = req.body.imageUrl
    const price = req.body.amount
    const description = req.body.description
    const id = req.body.productId

    

    Product.findById(id).then(product=>{
        product.title = title
        product.description = description
        product.imageUrl = imageUrl
        product.price = price
        return product.save()
    })
    
    .then(product=>{
        console.log('product updated')
        // console.log(product)
        res.redirect('/')
    }).catch(err=>console.log(err))
   
}

const getDeleteProduct = function(req, res, next){
    const deleteId = req.body.productId
    Product.findByIdAndDelete(deleteId)
    .then(result=>{
        console.log('Product deleted')
        res.redirect('/')
    }).catch(err=>console.log(err))
    
}


module.exports = {
    redirectHome:redirectHome,
    getForm:getForm,
    getAllProducts:getAllProducts,
    getEditProductPage:getEditProductPage,
    editProductItem:editProductItem,
    getDeleteProduct:getDeleteProduct
}

/*const Product = require('../module/product')





const getForm = (req,res,next)=>{
    res.render('admin/edit-product', {
        path:'admin/add-product',
        title:'add-product',
        editing:false
    })
}

const redirectHome = (req,res,next)=>{
    // console.log(req.body.product)
    // const products = new Products(null, req.body.name, req.body.description, req.body.imageUrl, req.body.amount)
    const title = req.body.name;
    const description = req.body.description
    const imageUrl = req.body.imageUrl
    const price = req.body.amount
    
    
    const product = new Product(title, description,imageUrl, price, null, req.user._id)
    product.save()
    .then(data=>{
        // console.log(data)
    })
    .then(data=>{
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err)
    })
  
    
}

const getAllProducts = function(req, res, next){
    Product.fetchAll()
         .then(products=>{
        res.render('admin/all-product',{
        products:products,
        path : 'admin/all-products',
        title:'all-product'
    })
     }).catch(err=>console.log(err))

     
}


const getEditProductPage = function(req,res,next){
    const editMode = req.query.edit

    if(editMode==='false'){
       return res.redirect('/')
    }

    const productId = req.params.productId
    
    Product.findProductById(productId)
    .then(product=>{
        
        
        if(!product){
            return
        }


        res.render('admin/edit-product',{
        title:'edit-product',
        path:'admin/edit-product',
        editing:editMode,
        product:product
    })
    }).catch(err=>console.log(err))

    

    
}


const editProductItem = function(req,res,next){
    const title = req.body.name
    const imageUrl = req.body.imageUrl
    const price = req.body.amount
    const description = req.body.description
    const id = req.body.productId

    

    const product = new Product(title, description, imageUrl, price, id)
    product.save()
    .then(product=>{
        console.log('product updated')
        // console.log(product)
        res.redirect('/')
    }).catch(err=>console.log(err))

    
    
}


const getDeleteProduct = function(req, res, next){
    const deleteId = req.body.productId
    Product.deleteProductById(deleteId)
    .then(result=>{
        console.log('Product deleted')
        res.redirect('/')
    }).catch(err=>console.log(err))
    
}

module.exports = {
    getForm:getForm,
    redirectHome:redirectHome,
    getAllProducts:getAllProducts,
    getEditProductPage:getEditProductPage,
    editProductItem:editProductItem,
    getDeleteProduct:getDeleteProduct
}

*/