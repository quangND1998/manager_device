<?php

namespace App\Http\Controllers\Api\AppLaucher;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\DevicesResource;
use App\Repositories\ApplicationRepository;
use App\Repositories\DeviceRepository;
use App\Repositories\GroupRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;

class GroupController extends Controller
{
    protected $application, $device, $group;




    public function __construct(ApplicationRepository $ApplicationRepository, DeviceRepository $deviceRepository, GroupRepository $groupRepository)
    {
        $this->application = $ApplicationRepository;
        $this->device = $deviceRepository;
        $this->group = $groupRepository;
    }

    /**
     * Get groups 
     *
     * @var int $userId
     * @var int $postId
     *
     * @return boolean
     */

    public function getGroups()
    {
        $groups = $this->group->groups();
        $devices =   $this->device->devicesNoGroup();
        $applications = $this->application->applicationsByDeivces($devices);
        // $groups = Cache::remember('groups', 15, function () {
        //     return
        //         $this->group->groups();
        // });
        // $devices = Cache::remember('devices', 15, function () {
        //     return
        //          $this->device->devicesNoGroup();
        // });
        // $applications = Cache::remember('applications', 15, function () use($devices){
        //     return
        //         $this->application->applicationsByDeivces($devices);
        // });

        $response  = [
            'groups' => $groups,
            'devices' => DevicesResource::collection($devices),
            'applications' => ApplicationResource::collection($applications)
        ];
        return response()->json($response, 200);
    }

    public function groupById($id)
    {

        $group = $this->group->show($id);

        if (!$group) {
            return response()->json('Not found group', 404);
        } else {
            $nogroup_devices =   $this->device->devicesNoGroup();

            $applications = $this->application->applicationsByDeivces($nogroup_devices);

            $devices = Arr::collapse([$nogroup_devices, $group->devices ?? []]);
            $response  = [
                'group' => $group,
                'devices' => DevicesResource::collection($devices),
                'applications' => ApplicationResource::collection($applications)
            ];
            return response()->json($response, 200);
        }
    }
}
