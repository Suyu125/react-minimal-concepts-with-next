"use client";

import { useId } from "react";

/**
 * UseIdDemo - Demonstrates React's `useId` hook
 * 
 * KEY CONCEPTS:
 * 1. Generating unique IDs for accessibility attributes
 *    - Prevents ID conflicts when components are rendered multiple times
 *    - Essential for proper ARIA relationships (aria-describedby, aria-labelledby)
 * 
 * 2. Generating IDs for several related elements
 *    - Use single useId() call with string concatenation for related elements
 *    - More efficient than multiple useId() calls
 * 
 * 3. Server-side rendering compatibility
 *    - useId ensures consistent IDs between server and client
 *    - Critical for hydration to work correctly
 * 
 * 4. DO NOT use for list keys
 *    - Keys should come from your data, not useId
 *    - useId is specifically for accessibility attributes
 */

// Password field component demonstrating basic useId usage
function PasswordField() {
  const passwordHintId = useId();
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Password:
        <input
          type="password"
          className="ml-2 px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded"
          aria-describedby={passwordHintId}
        />
      </label>
      <p id={passwordHintId} className="text-xs text-gray-400">
        The password should contain at least 8 characters
      </p>
    </div>
  );
}

// Form component demonstrating multiple related elements with shared ID prefix
function ContactForm() {
  const id = useId();
  
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor={id + '-firstName'} className="block text-sm font-medium mb-1">
          First Name:
        </label>
        <input 
          id={id + '-firstName'} 
          type="text" 
          className="w-full px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded"
        />
      </div>
      
      <div>
        <label htmlFor={id + '-lastName'} className="block text-sm font-medium mb-1">
          Last Name:
        </label>
        <input 
          id={id + '-lastName'} 
          type="text" 
          className="w-full px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded"
        />
      </div>
      
      <div>
        <label htmlFor={id + '-email'} className="block text-sm font-medium mb-1">
          Email:
        </label>
        <input 
          id={id + '-email'} 
          type="email" 
          className="w-full px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded"
        />
      </div>
    </form>
  );
}

// Toggle component demonstrating aria-describedby relationship
function ToggleWithDescription() {
  const toggleId = useId();
  const descriptionId = useId();
  
  return (
    <div className="space-y-2">
      <label htmlFor={toggleId} className="flex items-center space-x-2">
        <input
          id={toggleId}
          type="checkbox"
          className="rounded"
          aria-describedby={descriptionId}
        />
        <span className="text-sm">Enable notifications</span>
      </label>
      <p id={descriptionId} className="text-xs text-gray-400">
        You&apos;ll receive email updates about new features and important announcements.
      </p>
    </div>
  );
}

// Main demo component
export default function UseIdDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic useId Usage</h3>
        <p className="text-sm text-gray-300">
          Each PasswordField component gets a unique ID, even when rendered multiple times:
        </p>
        
        <div className="space-y-4">
          <PasswordField />
          <PasswordField />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Multiple Related Elements</h3>
        <p className="text-sm text-gray-300">
          Single useId() call with string concatenation for related form elements:
        </p>
        
        <ContactForm />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">ARIA Relationships</h3>
        <p className="text-sm text-gray-300">
          useId ensures proper accessibility relationships between form controls and descriptions:
        </p>
        
        <ToggleWithDescription />
      </div>

      <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded">
        <h4 className="font-semibold text-blue-300 mb-2">Key Benefits:</h4>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• Prevents ID conflicts in multiple component instances</li>
          <li>• Server-side rendering compatible</li>
          <li>• Essential for proper accessibility</li>
          <li>• More efficient than manual ID generation</li>
        </ul>
      </div>
    </div>
  );
}
