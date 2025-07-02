<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Stmt\TryCatch;

class ProductController extends Controller
{
    function addProduct(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'min:1', 'max:255', 'string'],
            'product_image' => ['required', 'image'],
            'description' => ['required', 'string'],
            'details' => ['required', 'string'],
            'price' => ['required'],
            'stars' => ['required'],
            'user_id' => ['required', 'string']
        ]);
        $validated['product_image'] =  asset( path: 'storage/' . $request->file('product_image')->store('product_image', "public"));

        try {
            $product = Product::create($validated);
        } catch (\Throwable $th) {
            return $th;
        }
        return $product;
    }
    function list()
    {
        return Product::all();
    }
    function delete($id)
    {
        $result = Product::where('id',$id)->delete();
        if($result){
            return ['result'=>'Product has been deleted'];
        }else{
            return ['result'=>'Operation faild'];
        }
    }
    function getProduct($id)
    {
        return Product::find($id);
    }
    function updateProduct(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'min:1', 'max:255', 'string'],
            'product_image' => ['required', 'image'],
            'description' => ['required', 'string'],
            'details' => ['required', 'string'],
            'price' => ['required'],
            'stars' => ['required'],
            'user_id' => ['required', 'string']
        ]);
        $validated['product_image'] = asset( 'storage/' . $request->file('product_image')->store('product_image', "public"));

        try {
            $result = Product::where('id',$id)->update($validated);
        } catch (\Throwable $th) {
            return $th;
        }
    }
    function search($key)
    {
        return Product::where('name','Like',"%$key%")->get();
    }
    function getCartProducts($id)
    {
        $idArray = explode(",", $id);
        return Product::whereIn('id', $idArray)->get();
    }
}
