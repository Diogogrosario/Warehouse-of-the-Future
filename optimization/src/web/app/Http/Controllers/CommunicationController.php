<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CommunicationController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function communicate(Request $request)
    {
        /* Get the IP address for the target host. */
        $address = gethostbyname('optimization');
        #$address = gethostbyname('host.docker.internal');

        /* Create a TCP/IP socket. */
        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

        if ($socket === false)
            return 'ERROR';

        $result = socket_connect($socket, $address, 5800);

        if ($result === false)
            return 'ERROR';

        $arr = array('optimization-parameters' => $request->input('optimization-parameters'),
            'optimization-weights' => $request->input('optimization-weights'));

        $str = json_encode($arr);

        socket_write($socket, $str, strlen($str));

        socket_read($socket, 0);

        socket_close($socket);

        return Redirect::route('home')->with('status', 'ok');
    }
}
