INSERT INTO applications (id, name, api_key) 
VALUES ('11111111-1111-1111-1111-111111111111', 'ElectroShop Demo', 'demo_key_123')
ON CONFLICT DO NOTHING;