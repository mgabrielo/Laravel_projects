<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addtocart(Request $request)
    {
        if (auth('sanctum')->check()) {

            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;
            $product_check = Product::where('id', $product_id)->first();
            if ($product_check) {
                $cart_exist = Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists();
                if ($cart_exist) {
                    return response()->json([
                        'status' => 409,
                        'message' => $product_check->name . 'Already in Your Cart'
                    ]);
                } else {

                    $cart_item = new Cart;
                    $cart_item->user_id = $user_id;
                    $cart_item->product_id = $product_id;
                    $cart_item->product_qty = $product_qty;
                    $cart_item->save();

                    return response()->json([
                        'status' => 201,
                        'message' => $product_check->name . 'Newly Added to Your Cart'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product Not Found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login To Add To Cart'
            ]);
        }
    }

    public function viewcart()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cart_items = Cart::where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'cart' => $cart_items,
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login To View Cart'
            ]);
        }
    }


    public function updatequantity($cart_id, $scope)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitems = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if ($scope == "inc") {
                $cartitems->product_qty += 1;
            } else if ($scope == 'dec') {
                $cartitems->product_qty -= 1;
            }

            $cartitems->update();
            return response()->json([
                'status' => 200,
                'message' => ' Cart Quantity Updated'
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login To View Cart'
            ]);
        }
    }


    public function delete_cart_item($cart_id)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cart = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if ($cart) {

                return response()->json([
                    'status' => 200,
                    'message' => 'Cart Item Deleted Suceessfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Cart Item Not Found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login To View Cart'
            ]);
        }
    }
}
