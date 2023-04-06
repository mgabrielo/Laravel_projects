<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function purchase(Request $request)
    {
        //make purchase

        $user = User::firstOrCreate(
            [
                'email' => $request->input('email')
            ],
        );

        try {
            $payment = $user->charge(
                $request->input('amount'),
                $request->input('payment_method_id')
            );

            $payment = $payment->asStripePaymentIntent();

            $order = $user->orders()
                ->create([
                    'transaction_id' => $payment->charges->data[0]->id,
                    'total' => $payment->charges->data[0]->amount
                ]);

            foreach (json_decode($request->input(key: 'cart'), true) as $item) {
                $order->products()->attach($item['id'], ['quantity' => $item['quantity']]);
            }

            $order->load('products');

            return $order;
        } catch (\Exception $e) {
            // handle exception

            return response()->json(['message' => $e->getMessage()], 200);
        }
    }
}
