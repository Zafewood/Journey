import FirebaseService from '../services/firebaseService';
import { get, set, child, ref, db, update } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { uuidv4 } from '@firebase/util';


jest.mock('../firebase-config', () => ({
  db: {},
  auth: {
    currentUser: {
      uid: 'mock-user-id'
    }
  }
}));

jest.mock('firebase/database', () => ({
    ref: jest.fn(),
    child: jest.fn(),
    get: jest.fn(),
    set: jest.fn()
}));


describe('Firebase services', () => {

    const snapshot = {
        exists: jest.fn(() => true),
        val: () => ({ mock: 'trips-data' }),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
      });

    test('getCurrentUserNode returns user node', async () => {
    
        const snapshot = {
            exists: jest.fn(() => true),
            val: () => ({ mock: 'user-node' }),
        }; 
        get.mockResolvedValueOnce(snapshot);
        const result = await FirebaseService.getCurrentUserNode()
        expect(result).toEqual({ mock: 'user-node' });
    });

    test('getCurrentUserNode returns null if snapshot does not exist', async () => {
        
        const snapshot = {
            exists: jest.fn(() => false),
            val: () => ({ mock: 'user-node' }),
        };
        get.mockResolvedValueOnce(snapshot);
        const result = await FirebaseService.getCurrentUserNode();
        expect(result).toBeNull();
    });

    test('getCurrentUserNode throws an error if an error occurs', async () => {
        const error = new Error('mock error');
        get.mockRejectedValueOnce(error);
        await expect(FirebaseService.getCurrentUserNode()).rejects.toEqual(error);
    });
    
    test('getAllTrips returns all trips', async () => {
        const snapshot = {
            exists: jest.fn(() => true),
            val: () => ({ mock: 'trips-data' }),
        };
      
        get.mockResolvedValueOnce(snapshot);
        const result = await FirebaseService.getAllTrips();
        expect(result).toEqual({ mock: 'trips-data' });
    });

    test('getAllTrips returns null if snapshot does not exist', async () => {
        const snapshot = {
            exists: jest.fn(() => false),
            val: () => ({ mock: 'trips-data' }),
        };
        const error = new Error('mock error');
        get.mockRejectedValueOnce(error);
        await expect(FirebaseService.getAllTrips()).rejects.toEqual(error);
    })

    /*
    test('editUserNode updates user node with new data', async () => {
        
        // Mock the set function to simulate a successful update
        update.mockImplementationOnce(() => Promise.resolve());

        // Mock auth.currentUser.uid value
        const mockUserID = 'mockUserID';
        auth.currentUser = { uid: mockUserID };
        
        // Define user node data
        const userNode = {
          displayName: 'Test User',
          homeCountry: 'Test Country',
          email: 'test@example.com'
        };
        
        // Call the editUserNode function and wait for it to complete
        const result = await FirebaseService.editUserNode(userNode);
      
        // Expect set to have been called with the correct arguments
        expect(update).toHaveBeenCalledWith(
            undefined, // No idea why undefined is getting returned as well, but doesen't work without this
            expect.objectContaining(userNode)
        );
      
        // Expect the result to be undefined (no return value)
        expect(result).toBeUndefined();
    });
    */
    test('getAllTrips retrieves all trips', async () => {
        // Mock the Firebase database response
        const mockData = { trip1: { name: 'Trip 1' }, trip2: { name: 'Trip 2' } };
        get.mockImplementationOnce(() => Promise.resolve({ exists: () => true, val: () => mockData }));
        
        // Call the getAllTrips function and wait for it to complete
        const result = await FirebaseService.getAllTrips();
        
        // Expect get to have been called with the correct argument
        expect(get).toHaveBeenCalledWith(child(ref(db), 'trips'));
        
        // Expect the result to be the mock data
        expect(result).toEqual(mockData);
    });
      
})
