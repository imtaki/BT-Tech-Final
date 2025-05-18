<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth('api')->user();

        if ($user->role == 'admin') {
            return response()->json(['message' => 'admin'], Response::HTTP_OK);
        } else if($user->role == 'editor') {
            return response()->json(['message' => 'editor'], Response::HTTP_OK);
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
}
