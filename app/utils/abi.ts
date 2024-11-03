export const CounterABi = [
  {
    "name": "ICounterImpl",
    "type": "impl",
    "interface_name": "cairo_bootcamp_3::counter::ICounter"
  },
  {
    "name": "cairo_bootcamp_3::counter::ICounter",
    "type": "interface",
    "items": [
      {
        "name": "get_count",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "set_count",
        "type": "function",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "cairo_bootcamp_3::counter::Counter::Event",
    "type": "event",
    "variants": []
  }
]