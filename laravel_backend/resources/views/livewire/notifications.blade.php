<div class="space-y-2">
    @foreach ($notifications as $notification)
        <div class="flex items-center justify-between p-2 border rounded {{ $notification->read_at ? 'bg-white' : 'bg-blue-100' }}">
            <div>
                {{ $notification->data['message'] ?? 'No message' }}
                <div class="text-xs text-gray-500">{{ $notification->created_at->diffForHumans() }}</div>
            </div>

            @if (is_null($notification->read_at))
                <button wire:click="markAsRead('{{ $notification->id }}')" class="text-sm text-blue-600 hover:underline">
                    Mark as read
                </button>
            @endif
        </div>
    @endforeach
</div>
